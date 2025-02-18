pipeline {
    agent any
    tools {nodejs "NODEJS"}
    stages {
        stage('Prepare Environment') {
            steps {
                configFileProvider([configFile(fileId: '84a07396-9e07-4eea-a679-1e59c85687f7', targetLocation: 'src/environments/environment.ts')]) {
                    sh 'sed -i "s/JENKINS_BUILD_NUMBER/$BUILD_NUMBER/g" src/environments/environment.ts'
                    sh 'cat src/environments/environment.ts' // Verify the file is present
                }
            }
        }
        stage('Build') {
            steps {
		            echo 'Build step ...'                
		            sh 'npm install'
                    sh 'npm install ts-md5'
		            sh 'npm run ng build'
            }
        }
        stage('Deliver') {
            steps {
		            echo 'Deliver step ...'
                    sh 'rm -rf /tmp/*'
                    sh 'mv /home/jenkins/workspace/mynab-frontend/dist/myapp/browser/*.* /tmp/'
		        }
        }
    }
}
