import React from 'react';

export const SideBar = () => {
	return (
		<div className='side-bar'>
			<img className='avatar' src='/assets/avatar.jpeg' />
			<h1>Bert Huang</h1>
			<p>一位兴趣广泛的前端程序员</p>
			<nav style={{ width: '80%' }}>
				<ul>
					<li>
						<a href='/blog/index.html'>Catalog</a>
					</li>
					<li>
						<a href='/blog/about.html'>About</a>
					</li>
				</ul>
			</nav>
			<div id='social'>
				<a href='https://github.com/Bert0324'>
					<img className='social-avatar' src='https://github.githubassets.com/favicons/favicon.png' />
				</a>
			</div>
		</div>
	);
}