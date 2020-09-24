import React from 'react';
// Utils
import Clipboard from 'clipboard';
// Styles
import styled from 'styled-components';

function Contact() {
	const clip = new Clipboard('.btn');

	clip.on('success', () => {
		alert('My email address has been copied to your clipboard.');
	});
	clip.on('error', () => {
		alert("That didn't work, sorry :(");
	});

	return (
		<ContactDiv>
			<Footer>
				<div className='btn' data-clipboard-text='chaseofthecollins@gmail.com'>
					<i className='fas fa-envelope'></i>
				</div>
				<a
					href='https://www.linkedin.com/in/chase-collins42/'
					target='_blank'
					rel='noopener noreferrer'
				>
					<i className='fab fa-linkedin-in'></i>
				</a>
				<a
					href='https://github.com/Chase-42'
					target='_blank'
					rel='noopener noreferrer'
				>
					<i className='fab fa-github'></i>
				</a>
				<a href='https://dev.to/chase42' target='_blank' rel='noopener noreferrer'>
					<i class='fab fa-dev'></i>
				</a>
			</Footer>{' '}
			<p>Copyright © Chase Collins 2020</p>
		</ContactDiv>
	);
}

export default Contact;

const ContactDiv = styled.div`
	width: 100%;
	p {
		text-align: center;
		position: relative;
		bottom: 0;
		font-size: 0.6rem;
		@media (max-width: 500px) {
			font-size: 0.7rem;
		}
	}
`;
const Footer = styled.footer`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	margin: auto;
	width: 70%;
	position: relative;
	bottom: 0;
	text-align: center;
	margin-top: 10%;
	div {
		box-shadow: none;
	}
	@media (max-width: 1435px) {
		margin-top: 15%;
	}
	button {
		text-decoration: none;
	}
	i {
		transition: all 0.2s ease-in-out;
		margin-right: 5%;
		cursor: pointer;
		color: black;
		@media (max-width: 875px) {
			font-size: 1.1em;
		}
		&:hover {
			transform: scale(1.2);
		}
	}
`;
