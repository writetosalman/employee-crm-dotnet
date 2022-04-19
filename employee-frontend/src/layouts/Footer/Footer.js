import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';

import AppContext from '../../core/stores/AppContext';

function Footer() {
	// useContext react hook is a simpler option, below is just for learning purpose
	return (
		<AppContext.Consumer>
			{context => (
				<footer>


					<div className='red'>
						<Row className='row-ex'>
							<Col xs={12}>
								<ul className='social-networks text-end'>
									<li>
										<span className='app-version'>v{context.stores.rootStore.version}</span>
									</li>
								</ul>
							</Col>
						</Row>
					</div>
				</footer>
			)}
		</AppContext.Consumer>
	);
}

export default Footer;
