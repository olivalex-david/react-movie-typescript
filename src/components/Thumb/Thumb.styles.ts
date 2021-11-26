import styled from 'styled-components';

export const Text = styled.p`
    font-size: var(--fontMed);
    color: var(--medGrey);
    font-weight: bold;
    position: relative;
    text-align: center;
    //margin-top: 0px;
`;

export const Image = styled.img`
    width: 100%;
    max-width: 480px;
    transition: all 0.3s;
    object-fit: cover;
    border-radius: 20px;
    animation: animateThumb 0.5s;

    :hover {
        opacity: 0.8;
    }

    @keyframes animateThumb {
        from{
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;