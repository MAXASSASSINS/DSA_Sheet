import React from 'react'
import { useRevision } from './RevisionContext';

const RevisionProblemsToggler = () => {
	const { toggleRevisedProblem, showOnlyRevisionProblem } = useRevision();


	return (
		<div className='flex justify-end mt-12 mr-4'>
			<div className='flex gap-2 rounded cursor-pointer [&>*]:cursor-pointer items-center p-2 px-4 bg-[rgba(255,255,255,0.2)]'>
				<input type="checkbox"
				className='w-4 h-4'
					id="revision"
					checked={showOnlyRevisionProblem}
					onChange={(e) => toggleRevisedProblem(e.target.checked)} />
				<label htmlFor="revision">Show only revision problems</label>
			</div>
		</div>
	)
}

export default RevisionProblemsToggler