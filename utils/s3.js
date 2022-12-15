const fs = require('fs');
const S3 = require('aws-sdk/clients/s3');
const path = require('path');

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new S3({
	region,
	accessKeyId,
	secretAccessKey
})


// uploads a file to s3
function uploadFile(file) {
    try {
        const fileStream = fs.createReadStream(file.path)
        const uploadParams = {
            Bucket: bucketName,
            Body: fileStream,
            Key: file.filename
        }  
        return s3.upload(uploadParams).promise()
    } catch (error) {
        console.log(error);
    }
}

exports.uploadFile = uploadFile

// downloads a file from s3
function getFileStream(fileKey) { 
    try{
        const downloadParams = { 
            Key: fileKey, 
            Bucket: bucketName 
        } 
        const result = s3.getObject(downloadParams).createReadStream();
        return result;
    } catch (error) {
        console.log(error);
    }
} 

exports.getFileStream = getFileStream


// uploads a file to s3
function deleteFile(key) {
    try {
        const deleteParams = {
		Bucket: bucketName,
		Key: key
        }
        return s3.deleteObject(deleteParams).promise()
    } catch (error) {
        console.log(error);
    }
}

exports.deleteFile = deleteFile;