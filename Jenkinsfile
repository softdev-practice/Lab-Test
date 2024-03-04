// CODE_CHANGES = getGitChanges()

pipeline {
    agent any

    tools {
        nodejs "NodeJS"
    }

    environment {
        ROBOT_GIT = "https://github.com/softdev-practice/Robot-Test-Lab.git"
    }

    stages {
        stage("clear containers and images if exist") {
            steps {
                script {
                    def runningContainers = sh(script: 'docker ps -q | wc -l', returnStdout: true).trim().toInteger()
                    
                    if (runningContainers > 0) {
                        sh 'docker stop $(docker ps -a -q)'
                    } else {
                        echo "No action required. Running container count: $runningContainers"
                    }
                }
            }
        }

        stage("install packages") {
            steps {
                echo 'building the application...'
                sh 'npm install'
            }
        }

        stage("test") {
            steps {
                echo 'testing the application...'
                sh 'npm test'
            }
        }

        stage("docker up"){
            steps {
                echo 'Docker build...'
                sh 'pwd && ls -al'
                sh 'docker build -t lab_test .'
                sh 'docker run -d -p 6000:6000 lab_test'
                sh 'docker ps'
            }
        }

        stage("robot") {
            steps {
                echo 'Check for ./robot/'
                sh 'mkdir -p robot'
                echo 'Cloning Robot'
                dir('./robot/') {
                    git branch: 'main', url: "${ROBOT_GIT}"
                }
                echo 'Run Robot'
                sh 'cd robot && python3 -m robot --outputdir robot_result ./test_prime.robot'
            }
        }

        stage("Get API on VM2") {
            agent { label 'test' }
            steps {
                sh 'curl 172.16.48.131:6000/is_prime/17'
            }
        }

        stage("docker stop and prune") {
            agent { label 'test' }
            steps {
                echo 'Cleaning'
                sh 'docker system prune -a -f'
            }
        }
    }
}