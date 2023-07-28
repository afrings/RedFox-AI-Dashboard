import React from 'react';
import styled from 'styled-components';

export const Main: React.FC = () => {
    return (
        <styles.container>Hello World!</styles.container>
    )
};

const styles = {
    container: styled.div`
    color: black;
    font-weight: bold;`
};