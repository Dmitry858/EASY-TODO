import React from 'react';
import { connect } from 'react-redux';
import Topbar from './Topbar';

const About = (props) => {

    return (
        <React.Fragment>
            {(props.type === 'inner') && <Topbar />}

            <div className={(props.type === 'inner') ? 'content content-inner' : 'content'}>
                <div className="container">
                    <div className="title-wrap">
                        <h1>О сервисе</h1>
                    </div>
                    <p>Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Деревни последний грамматики языком скатился большого! Пустился жаренные всеми снова семантика маленькая ipsum залетают прямо последний. Пустился от всех не проектах! Имени не необходимыми lorem, свой пояс сбить реторический все! Обеспечивает своего назад живет одна не речью рукописи, диких текста повстречался, лучше прямо текст текстов курсивных безопасную, предупреждал раз! Напоивший, единственное.</p>
                </div>
            </div>
        </React.Fragment>
    );

};

export default connect(state => state)(About);