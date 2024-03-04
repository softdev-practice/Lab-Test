pipeline {
    agent none

    tools {
        nodejs "NodeJS"
    }

    environment {
        GITLAB_REGISTRY = "registry.gitlab.com/softdev-practice/exam_test"
        ROBOT_GIT = "https://github.com/softdev-practice/Robot-Test-Lab.git"
    }

    stages {
        stage("clear containers and images if exist") {
            agent any
            steps {
                script {
                    sh 'whoami'
                    def runningContainers = sh(script: 'docker ps -q | wc -l', returnStdout: true).trim().toInteger()
                    
                    if (runningContainers > 0) {
                        sh 'docker stop $(docker ps -a -q)'
                    } else {
                        echo "No action required. Running container count: $runningContainers"
                    }
                }
            }
        }

        stage("VM1: install packages") {
            agent { label 'master' }
            steps {
                echo 'building the application...'
                sh 'npm install'
            }
        }

        stage("VM1: test") {
            agent { label 'master' }
            steps {
                echo 'testing the application...'
                sh 'npm test'
            }
        }

        stage("VM1: docker up"){
            agent { label 'master' }
            steps {
                echo 'Docker build...'
                sh 'pwd && ls -al'
                sh 'docker build -t lab_test .'
                sh 'docker run -d -p 3000:3000 lab_test'
                sh 'docker ps'
            }
        }

        stage("VM1: robot") {
            agent { label 'master' }
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

        stage("VM1: push to registry") {
            agent { label 'master' }
            steps {
                echo 'Logining in...'
                withCredentials([
                    usernamePassword(credentialsId: 'jenkins_test', usernameVariable: 'DEPLOY_USER', passwordVariable: 'DEPLOY_TOKEN')
                ]) {
                    sh "docker login registry.gitlab.com -u ${DEPLOY_USER} -p ${DEPLOY_TOKEN}"
                }
                sh "docker build -t ${GITLAB_REGISTRY} ."
                sh "docker push ${GITLAB_REGISTRY}"
                echo 'Push Success!'
            }
        }

        stage("VM1: docker stop and prune") {
            agent { label 'master' }
            steps {
                echo 'Cleaning'
                sh 'docker stop $(docker ps -a -q)'
                sh 'docker system prune -a -f'
            }
        }

        stage("VM2: pull image from registry") {
            agent { label 'test' }
            steps {
                sh 'docker stop $(docker ps -a -q)'
                echo 'Logining in...'
                withCredentials([
                    usernamePassword(credentialsId: 'jenkins_test1', usernameVariable: 'DEPLOY_USER', passwordVariable: 'DEPLOY_TOKEN')
                ]) {
                    sh "docker login registry.gitlab.com -u ${DEPLOY_USER} -p ${DEPLOY_TOKEN}"
                }
                sh "docker pull ${GITLAB_REGISTRY}"
                sh "docker run -d -p 3000:3000 ${GITLAB_REGISTRY}"
                echo 'Create Container Success!'
            }
        }
    }
}