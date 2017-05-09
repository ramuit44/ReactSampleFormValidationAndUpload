import styled from 'styled-components';

const List = styled.ul`
    font-size: .8em;
    list-style: none;
    margin: .5em 0;
    padding: 0;

    li {
        border-bottom: 1px solid #f0f0f0;
        display: flex;
        margin: 0;
        padding: .5em .25em;
        width: 100%;

        > span:first-child {
            width: 35%;
        }
    };
`;

export default List;
