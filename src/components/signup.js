function SignUp(){
    return(
        <div className="form d-flex justify-content-center align-items-center card-body">
            <div className="card p-3 v-100" style={{width:"25rem"}}>
                <div className="">
                    <h4 className="text-center mb-4">SIGN-UP</h4>
                 <form>
                <input type="text" className="form-control mb-3" placeholder="Enter your Name"/>
                <input type="email" className="form-control mb-3" placeholder="Enter your Email"/>
                <input type="password" className="form-control mb-3" placeholder="Enter your Password"/>
                <input type="password" className="form-control mb-3" placeholder="Confirm your Password"/>
                <div className="d-grid">
                <button type="submit" className="btn btn-primary " placeholder="User Id">Register</button>
                </div>
            </form>
            </div>
            </div>
           
        </div>
    )
}
export default SignUp;