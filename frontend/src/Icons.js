const EyeCloseIcon = (props) =>(
    <svg xmlns="http://www.w3.org/2000/svg" onClick={props.toggleEye} className="input-right-icon" viewBox="0 0 48 48">
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_2-2" data-name="Layer 2">
          <line className="cls-1" x1="21.75" y1="16.11" x2="21.75" y2="25.98"/>
          <line className="cls-1" x1="8.39" y1="14.02" x2="2.93" y2="22.57"/>
          <line className="cls-1" x1="35.11" y1="12.01" x2="41.03" y2="21"/>
          <path className="cls-1" d="M41.82,1.5C39.9,9.73,31.59,15.92,21.64,15.92S3.49,9.81,1.5,1.66"/>
        </g>
      </g>
    </svg>  
  )

const EyeIcon = (props) =>(
    <svg xmlns="http://www.w3.org/2000/svg" onClick={props.toggleEye} className="input-right-icon" viewBox="0 0 48 48">
    <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_2-2" data-name="Layer 2">
        <path className="cls-1" d="M41.19,16.2c-1.83-8.38-10-14.7-19.86-14.7S3.39,7.75,1.5,16.07"/>
        <circle className="cls-1" cx="21.22" cy="19.61" r="9.17"/>
        </g>
    </g>
    </svg>
)

const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" preserveAspectRatio="xMidYMid meet" className="input-icon">
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_3" data-name="Layer 3">
          <line className="cls-1" x1="20.98" y1="19.47" x2="2.5" y2="37.94"/>
          <circle className="cls-1" cx="28.35" cy="12.09" r="9.59"/>
          <line className="cls-2" x1="11.74" y1="28.7" x2="17.01" y2="33.97"/>
          <line className="cls-2" x1="5.68" y1="33.83" x2="11.83" y2="39.99"/>
        </g>
      </g>
    </svg>  
);

const UserIcon = () =>(
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" preserveAspectRatio="xMidYMid meet" className="input-icon">
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_2-2" data-name="Layer 2">
          <circle className="cls-1" cx="20.02" cy="13.04" r="10.54"/>
          <path className="cls-1" d="M38,44.58c0-11.59-7.95-21-17.75-21S2.5,33,2.5,44.58"/>
        </g>
      </g>
    </svg>
);

const EnvelopeIcon = () =>(
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 91.43 74.59" style={ {strokeWidth: 5} }  preserveAspectRatio="xMidYMid meet" className="input-icon">
    <g id="Layer_2" data-name="Layer 2">
      <g id="Layer_1-2" data-name="Layer 1">
        <rect x="3" y="3" width="85.43" height="68.59" rx="5.36"/>
        <path d="M3,16.7,43.85,45a3.44,3.44,0,0,0,2,.61h0a3.36,3.36,0,0,0,1.92-.6L88.43,16.7"/>
      </g>
    </g>
  </svg>
)

const GoogleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px">
    <path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
    <path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
    <path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
    <path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
  </svg>
);

const PinIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 89 93" className={"pin-icon " + props.spanClass}>
    <path id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" className="cls-1" d="M67.5,479H105c3.8,0,10.206-.345,15-5a18.106,18.106,0,0,0,5-10v93a18.106,18.106,0,0,0-5-10c-4.794-4.655-11.2-5-15-5H67.5A31.5,31.5,0,0,1,67.5,479Z" transform="translate(-36 -464)"/>
  </svg>
);

const SignOutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 403.813 302" className="navbar-icon">
    <path d="M302,135L405,238H185a14.62,14.62,0,0,0,0,27H405L302,368a13.477,13.477,0,0,0,18,19L450,258a9.667,9.667,0,0,0,0-14c-7.726-9.03-101.336-100.883-130-129A14.093,14.093,0,0,0,302,135ZM192,403H88c-11.74-1.348-21.467-5.523-28-13-6.763-7.74-8.418-16.756-9-24-2.651-33-1.82-155.852-1-228a37.5,37.5,0,0,1,38-37H192a13.869,13.869,0,0,1,0,26H88c-4.312-.182-7.747.747-10,3-1.952,1.952-2.842,4.715-3,8-0.636,13.189.515,164.875,1,226a16.916,16.916,0,0,0,5,10,16.672,16.672,0,0,0,7,4l104-1A13.45,13.45,0,0,1,192,403Z" transform="translate(-49.188 -101)"/>
  </svg>
)

export {UserIcon,LockIcon,EyeIcon,EyeCloseIcon,EnvelopeIcon,GoogleIcon,PinIcon,SignOutIcon};
