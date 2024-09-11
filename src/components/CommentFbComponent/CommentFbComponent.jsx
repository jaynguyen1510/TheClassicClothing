import React from 'react';
import { CommentWrapper } from './style';

const CommentFbComponent = ({ dataHref, width }) => {
    return (
        <CommentWrapper>
            <div
                className="fb-comments"
                data-href={dataHref}
                data-width={width ? width : '100%'}
                data-numposts="5"
            ></div>
        </CommentWrapper>
    );
};

export default CommentFbComponent;
