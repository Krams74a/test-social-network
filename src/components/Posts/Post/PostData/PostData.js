import React from 'react';

const PostData = (props) => {
    const months = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"]
    const convertDate = (created) => {
        const createdDate = created.split("T")[0]
        const year = createdDate.split("-")[0]
        const month = months[Number(createdDate.split("-")[1]) - 1]
        const day = createdDate.split("-")[2]
        const currentYear = new Date().getFullYear()
        const currentDay = new Date().getDay()
        if (currentDay - day === 1) {
            return "Вчера"
        }

        if (currentYear - year > 0) {
            if (currentYear - year === 1) {
                return currentYear - year + " год назад"
            } else if (currentYear - year > 1 && currentYear - year < 5) {
                return currentYear - year + " года назад"
            } else {
                return currentYear - year + " лет назад"
            }

        } else {
            return day + " " + month
        }
    }

    return (
        <div className={"card-date"}>
            <span>
                {convertDate(props.created)}
            </span>
        </div>
    );
};

export default PostData;
