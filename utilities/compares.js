function compareDate(date, nowDate) {
	if (parseInt(nowDate.substring(0,4)) <= parseInt(date.substring(0,4))) {
		if (parseInt(nowDate.substring(5,7)) <= parseInt(date.substring(5,7))) {
			if (parseInt(nowDate.substring(8)) <= parseInt(date.substring(8))) {
				return false
			} else {
				return true
			} 
		} else {
			return false
		}
	} else {
		return false
	}
}

module.exports = compareDate