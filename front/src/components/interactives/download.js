import React from 'react';
import Button from '@mui/material/Button';
import * as XLSX from 'xlsx'

const download = async() => {
    const response = await fetch(`http://localhost:5005/download`);
    console.log(response);
    const blob = await response.blob();
    console.log(blob);
    const aElement = document.createElement('a');
    aElement.setAttribute('download', 'user_data.xlsx');
    const href = URL.createObjectURL(blob);
    aElement.href = href;
    aElement.setAttribute('target', '_blank');
    aElement.click();
    URL.revokeObjectURL(href);
}

const DownloadXLSX = () => {
    return (
        <div style={DropDownStyle}>
            <Button variant='contained' sx={dateDropDownButtonStyle} disableElevation onClick={download}>Download As XLSX</Button>
        </div>
    )
}

const DropDownStyle = {
    position: 'absolute',
    top: '1.5vh',
    right: '200px',
};

const dateDropDownButtonStyle = {
    background: '#f55353',
    '&:hover': {
        background: '#e01f1f',
    }
}

export default DownloadXLSX;