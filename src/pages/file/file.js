import React, { Component } from 'react'
import PageHead from "../../components/pageheader";
import FileViewer from 'react-file-viewer';
export default class File extends Component {
    onError(e){
        console.log(e)
    }
    render() {
        return (
            <div>
                {/*<PageHead />*/}
                <FileViewer
                    fileType={'xlsx'}
                    filePath={require('../../assets/POU.xlsx')}
                    // errorComponent={CustomErrorComponent}
                    onError={this.onError()} />
            </div>
        )
    }
}
