const {sesClient} = require('../config/awsConfig')

module.exports.sendforgotPasswordEmail = async (email,token) => {
    console.log('mail function')
    const subject = 'Password Reset'
    const lostLink = 'reset_link' + '?email=' + encodeURIComponent(email) + '&lost=' + token;
	const params = {
		Source: 'prasanna@antstack.io',
		Destination: {
			ToAddresses: [
				email
			]
		},
		Message: {
			Subject: {
				Data: subject
			},
			Body: {
				Html: {
					Data: '<html><head>'
					+ '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />'
					+ '<title>' + subject + '</title>'
					+ '</head><body>'
					+ 'Please <a href="' + lostLink + '">click here to reset your password</a> or copy & paste the following link in a browser:'
					+ '<br><br>'
					+ '<a href="' + lostLink + '">' + lostLink + '</a>'
					+ '</body></html>'
				}
			}
		}
    }
    const sendEmailPromise = sesClient.sendEmail(params).promise()
    let promise = new Promise((resolve, reject) => { 
        sendEmailPromise
            .then(data => {
                console.log("email sent", data);
                resolve(data)
            })
            .catch(error => {
                console.log(error);
                reject(error)
            });
    });
    const response = await promise;
    return response;
}