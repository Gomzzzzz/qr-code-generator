import React, { Component } from 'react';
import QRCode from 'qrcode.react';
import '../styles/styles.css';

class QRCodeGenerator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            link: '',
            name: '',
            qrCodeValue: ''
        };
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    generateQRCode = () => {
        const { link, name } = this.state;
        if (link) {
            this.setState({ qrCodeValue: link });
        }
    };

    downloadQRCode = () => {
        const canvas = document.querySelector('.qr-code-output canvas');
        const pngUrl = canvas
            .toDataURL('image/png')
            .replace('image/png', 'image/octet-stream');
        let downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = 'qr-code.png';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    render() {
        const { qrCodeValue, name } = this.state;

        return (
            <div className="qr-code-generator">
                <input
                    type="text"
                    name="link"
                    placeholder="Enter link"
                    onChange={this.handleInputChange}
                />
                <input
                    type="text"
                    name="name"
                    placeholder="Enter name"
                    onChange={this.handleInputChange}
                />
                <button onClick={this.generateQRCode}>Generate QR Code</button>
                {qrCodeValue && (
                    <div className="qr-code-output">
                        <QRCode value={qrCodeValue} />
                        {name && <p>{name}</p>}
                        <button onClick={this.downloadQRCode}>Download QR Code</button>
                    </div>
                )}
            </div>
        );
    }
}

export default QRCodeGenerator;