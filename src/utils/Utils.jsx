import Moment from 'moment';

export default {
    formatTimestamp(myTimestamp) {
        let d = myTimestamp != null ? Moment(myTimestamp) : Moment();
        return d.format('YYYY-MM-DD HH:mm:ss');
    }
};