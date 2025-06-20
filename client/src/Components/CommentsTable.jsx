import React from 'react';

const CommentsTable = ({ comments, onApprove, onDisapprove ,onDelete }) => (
  
  <div className="container-fluid ">
   <div className="row">
    <div className="col-12">
      <div className="table-responsive">
    <table className="table table-striped ">
      <thead>
        <tr>
           <th>#</th>
          <th style={{ width: '13%' }} >Blog </th>
          <th style={{ width: '13%' }}>Commenter</th>
          <th  style={{ width: '20%' }}>Comment</th>
           <th  style={{ width: '8%' }}>Replied</th>
          <th  style={{ width: '11%' }}>Date</th>
          <th style={{ width: '9%' }}>Status</th>
          <th >Actions</th>
        </tr>
      </thead>
      <tbody>
        {comments.map((comment,index) => {
          //console.log("Approved:", comment.status);
          //console.log(`Status: '${comment.status}'`);


  return (
          <tr key={comment._id}>
           <td>{index + 1}</td>
      <td>{comment.blog?.title?
      comment.blog.title.match(/.{1,12}/g).map((chunk,i)=>(
        <React.Fragment key={i}>
          {chunk}
          <br/>
        </React.Fragment>
      ))
      :'Blog'}</td>
      <td>
        {comment.user?.name ||comment.guest?.name || comment.guest?.Email || 'Guest'}
      </td>
      <td>
  {comment.text || comment.content ? (
    (comment.text || comment.content).match(/.{1,12}/g).map((chunk, i) => (
      <React.Fragment key={i}>
        {chunk}
        <br />
      </React.Fragment>
    ))
  ) : (
    "No comment"
  )}
      </td> 
      <td>{comment.replies?.length || 0}</td>
      <td>{new Date(comment.date ||comment.createdAt).toLocaleDateString()}</td>
             <td>
        <span className={`badge ${  comment.status === 'approved' ? 'bg-success' :   comment.status === 'disapproved'? 'bg-danger' : 'bg-warning text-dark'}`}>
          {comment.status === 'approved'
    ? 'Approved'
    : comment.status === 'disapproved'
    ? 'Disapproved'
    : 'Pending'}
        </span>
      </td>
       <td>
       
          <button style={{ width:"fit-content" }}
            className="btn btn-sm btn-success me-1"
            onClick={() => onApprove(comment._id)}
              disabled={comment.status === 'approved'|| comment.status === 'disapproved'}
          >
         {comment.status === 'approved' ? "Approved" : "Approve"}
          </button>
     
         
          <button style={{ width:"fit-content" }}
            className="btn btn-sm btn-warning me-1"
            onClick={() => onDisapprove(comment._id)}
            disabled={comment.status === 'disapproved' || comment.status === 'approved'}
          >
           {comment.status === 'disapproved' ? "Disapproved" : "Disapprove"}
          </button>
        
        <button style={{ width:"fit-content" }}
          className="btn btn-sm btn-danger"
          onClick={() => onDelete(comment._id)}
             disabled={comment.status === 'approved' || comment.status === 'disapproved'|| comment.status !== 'pending'}
        >
          Delete
        </button>
      </td>
    </tr>
  );
})}
</tbody>
    </table>
  </div>
    </div>
  </div>
 </div>

)
export default CommentsTable;
