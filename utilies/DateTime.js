import moment from "moment"
export const convertDateTimeToString = (datetime) =>{
    return moment(datetime).format('YYYY-MM-DD')
}

export const formatDate = (datetime) =>{
    return moment(datetime).format('YYYY')
}