export function getRedirectTo(user_type,avantar) {
	let path
	//Job Seeker, Recruiters
	if (user_type==='recruiters') {
		path="/recruiters"
	}
	else {
		path="/job-seeker"
	}
	if (!avantar) {
		path+="-info"
	}
	return path
}