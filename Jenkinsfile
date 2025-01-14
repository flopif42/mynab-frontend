pipeline {
    agent any
    tools {nodejs "NODEJS"}
    stages {
        stage('Build') {
            steps {
		            echo 'Build step ...'                
		            sh 'npm install'
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
