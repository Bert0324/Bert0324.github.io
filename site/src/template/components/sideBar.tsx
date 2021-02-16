import React from 'react';

export const SideBar = () => {
	return (
		<div className='side-bar'>
			<img className='avatar' src='/assets/avatar.jpeg' />
			<h1>Bert Huang</h1>
			<p>一位兴趣广泛的前端程序员</p>
			<nav>
				<ul>
					<li>
						<a href='/blog/index.html'>Index</a>
					</li>
					<li>
						<a href='/blog/code.html'>Code</a>
					</li>
					<li>
						<a href='/blog/leetcode.html'>LeetCode</a>
					</li>
					<li>
						<a href='/blog/essay.html'>Essay</a>
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
				<a href='https://www.facebook.com/people/Yuchen-Huang/100005315205237'>
					<img className='social-avatar' src='/assets/facebook.png' />
				</a>
				<a href='https://twitter.com/BertHuang5'>
					<img className='social-avatar' src='/assets/twitter.png' />
				</a>
			</div>
			<div className='views-count'>
				<p id="busuanzi_container_site_pv" style={{ display: 'inline' }}>total views: <span id="busuanzi_value_site_pv"></span></p>
			</div>
		</div>
	);
}