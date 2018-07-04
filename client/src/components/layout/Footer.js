import React from 'react';

// const iconStyle = {
//   width: 100px
// };


export default () => {
  return (
    <footer className="bg-light text-dark mt-5 p-4 text-center">
      <p>
        Copyright &copy; {new Date().getFullYear()} RemotelyJS
</p>
      <p>
        <a href="https://www.linkedin.com/company/remotelyjs/"><i style={{ fontSize: 25, marginBottom: 0, marginRight: 5, color: 'green' }} className="fab fa-linkedin"></i></a>
        <a href="https://www.facebook.com/remotelyjs"><i style={{ fontSize: 25, marginBottom: 0, marginRight: 5, color: 'green' }} className="fab fa-facebook-square"></i></a>
        <a href="https://twitter.com/remotelyjs"><i style={{ fontSize: 25, marginBottom: 0, marginRight: 5, color: 'green' }} className="fab fa-twitter-square"></i></a>
        <a href="https://www.facebook.com/groups/1655682064529818"><i style={{ fontSize: 25, marginBottom: 0, marginRight: 5, color: 'green' }} className="fas fa-users"></i></a>


      </p>
      <a href='mailto:contact@remotelyjs.com'>contact@remotelyjs.com</a>


    </footer>
  );
};
