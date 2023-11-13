import { parseISO, formatDistanceToNow } from "date-fns";

const GetTime = ({ timer }) => {
    let timeAgo = ""
    if (timer) {
        const date = parseISO(timer)
        const timePeriod = formatDistanceToNow(date)
        timeAgo = `${timePeriod} ago...`;
    }

    return (
        <span title={timer}>
            <i>{timeAgo}</i>
        </span>
    )
}

export default GetTime;