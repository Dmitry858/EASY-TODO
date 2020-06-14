import React from 'react';
import Topbar from './Topbar';

const NotFound = (props) => {

    return (
        <React.Fragment>
            {(props.type === 'inner') && <Topbar />}

            <div className={(props.type === 'inner') ? 'content content-inner' : 'content'}>
                <div className="container">
                    <div className="title-wrap">
                        <h1>Ошибка 404</h1>
                    </div>
                    <p>Страница не существует или была переименована. Воспользуйтесь меню, чтобы перейти в нужный раздел.</p>
                </div>
            </div>
        </React.Fragment>
    );

};

export default NotFound;