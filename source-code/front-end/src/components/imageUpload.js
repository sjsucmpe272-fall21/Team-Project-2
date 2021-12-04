import React, {Component} from 'react';

import S3FileUpload from 'react-s3';

const config = {
    bucketName: '272projectgroup2',
    dirName: 'Resume', 
    region: 'us-east-1',
    accessKeyId: 'AKIARXSDAEBF3GIDK2VY',
    secretAccessKey: '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',
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