import React from 'react';
import PaperContainer from '../../components/PaperContainer';
import Typography from 'material-ui/Typography';
import { Link } from 'react-router-dom';
import Seperate from '../../components/Seperate';

export default ({ title, dead, injured, place, _id, time, description }) => (
	<div style={{ marginBottom: 10 }}>
		<PaperContainer>
			<Typography type="headline">
				{title}
			</Typography>
			<Typography type="body1">
				Vắn tắt: {description}
			</Typography>
			<Typography type="body1">
				Số người chết: {dead}
			</Typography>
			<Typography type="body1">
				Số người bị thương: {injured}
			</Typography>
			<Typography type="body1">
				Địa điểm: {place}
			</Typography>
			<Typography type="body1">
				Thời điểm: {time}
			</Typography>
			<Seperate size={10} />
			<Typography type="body1">
				<Link to={`/posts/${_id}`}>
					Chi tiết >>
				</Link>
			</Typography>
		</PaperContainer>
	</div>
);
