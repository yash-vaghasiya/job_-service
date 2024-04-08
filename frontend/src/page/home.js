import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import UserJobDialog from '../component/createJob';
import JobTable from '../component/jobtable';
import { fetchJobsFromBackend } from '../actions';

function Home({jobs, loading, error, fetchJobsFromBackend}) {
  const [open, setOpen] = useState(false);
  const [showtable, setShowtable] = useState(false);
  const [database] = useState('mongodb'); 

  useEffect(() => {
    fetchJobsFromBackend(database);

  const interval = setInterval(() => {
    fetchJobsFromBackend(database);
  }, 10000); 

  return () => clearInterval(interval);
}, [fetchJobsFromBackend, database]);

console.log(jobs)
const activeJobs = Array.isArray(jobs)
? jobs.filter((job) => job.status === 'submitted' || job.status === 'in_progress' || job.status === 'active')
    : [];
  
  console.log("activeJobs",activeJobs)

const inActiveJobs = Array.isArray(jobs)
? jobs.filter(
    (job) =>
      job.status === 'completed' ||
      job.status === 'canceled' ||
      job.status === 'failed' ||
      job.status === 'closed' ||
      job.status === 'finished'
  )
: [];

  return (
    <>
      <div className="container">
        <button onClick={() => setOpen(true)} className="button top-left">
          + New
        </button>
        <div className="box-container">
          <div className="box large-box" onClick={() => { setShowtable(false) }}>
            Active Jobs:
            <b>{activeJobs?.length}</b>
          </div>
          <div className="box large-box" onClick={() => { setShowtable(true) }}>Finish jobs: <b>{inActiveJobs?.length}</b></div>
        </div>
        <JobTable activeJobs={activeJobs} />
        {
          showtable &&
          <div style={{ marginTop: 15 }}>
            <JobTable activeJobs={inActiveJobs} />
          </div>
        }
      </div>

      <UserJobDialog open={open} setOpen={setOpen} />
    </>

  );
}

const mapStateToProps = (state) => ({
  jobs: state.jobs.jobs.jobs,
  loading: state.jobs.loading,
  error: state.jobs.error,
});

export default connect(mapStateToProps, { fetchJobsFromBackend })(Home);
