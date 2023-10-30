node {
    stage('Checkout') {
        git branch: 'main', url: 'https://github.com/rajansuri/monolithic-nodejs.git'
    }

    stage('Build') {
        // Determine which directory has changes
        def changes = sh(script: 'git diff --name-only HEAD~1 HEAD', returnStdout: true).trim()
        echo "Changes: ${changes}"

        def dirs = ['auth', 'user_details', 'product_details']
        def buildDir = dirs.find { dir -> changes.contains("${dir}/") }

        if (buildDir) {
            echo "Building service: ${buildDir}"
            sh "cd ${buildDir} && npm install"
            sh "cd ${buildDir} && npm run build"
            //sh "cd ${buildDir} && npm run test:auth"
        } else {
            echo "No changes detected in service directories"
        }
    }
}
