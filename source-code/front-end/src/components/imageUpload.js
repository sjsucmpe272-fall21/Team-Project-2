import React, {Component} from 'react';
import S3FileUpload from 'react-s3';
import aws from './keys'

const config = {
    bucketName: 'reskill-bucket',
    
    region: 'us-east-1',
    accessKeyId: aws.accessKeyId,
    secretAccessKey: aws.secretAccessKey,
}

export default class imageUpload extends Component {
   
    uplaod(e){
        console.log(e.target.files[0]);
        S3FileUpload.upload(e.target.files[0], config)
        .then((data)=>{
            console.log(data);
        })
        .catch((err)=>{
            alert(err);
        })
    }
    render(){
        return (
            <div>
                <h1>
                    AWS S3 uploadklll
                </h1>
                <input type="file"
                onChange={this.upload}>
                </input>
            </div>
        )
    }
}
 //export default imageUpload;