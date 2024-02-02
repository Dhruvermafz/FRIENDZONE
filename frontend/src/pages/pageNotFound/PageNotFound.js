import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import classes from './PageNotFound.module.css';
import { Link } from 'react-router-dom';

const PageNotFound = (props) => {
	const history = useHistory();

	const [mounted, setMounted] = useState(false);

	//protected route
	useEffect(() => {
		setMounted(true);
	}, [props.token]);

	if (mounted === false) {
		if (props.token === null) {
			history.push('/login');
			return null;
		}
	}

	return (
		<div className={`container d-flex flex-column  ${classes.looks} `}>
			<h1>404!</h1>
			<h4>Page not found</h4>
			<p>
				return back to <Link to='/'>Home</Link>
			</p>
		</div>
	);
};

const mapStateToProps = (state) => ({
	loading: state.auth.loading,
	token: state.auth.token,
	error: state.auth.error,
});

export default connect(mapStateToProps)(PageNotFound);
