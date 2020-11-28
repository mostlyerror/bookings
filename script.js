const aws = require('aws-sdk')
const s3 = new aws.S3()

// s3.listBuckets({}, (err, data) => {
// 	if (err) console.log(err, err.stack)
// 	else     console.log(data)
// })

const fs = require('fs')
const fileName = 'cat.txt'
const fileContent = fs.readFileSync(fileName);
const uploadParams = {
	Bucket: 'bookings-scraper',
	Key: fileName,
	Body: fileContent
}
s3.upload(uploadParams, (err, data) =>  {
	if (err) throw err;
	console.log(`upload succesful: ${data.location}`);
	console.log(data)
})


