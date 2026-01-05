import React from "react";

function Login() {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-primary text-2xl mb-4">Login</h2>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            className="input input-bordered"
            placeholder="Email"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            className="input input-bordered"
            placeholder="Password"
          />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>

        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>

        <div className="divider">OR</div>

        <p className="text-center text-sm">
          Don't have an account?
          <a href="#" className="link link-primary ml-1">Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
