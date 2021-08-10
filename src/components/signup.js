function SignUp(){
    return(
        <div className="form d-flex justify-content-center align-items-center">
            <div className="card p-3 v-100" style={{width:"30rem"}}>
                <div className="card-body">
                    <h4>SignUp</h4>
                 <form>
                <input type="text" className="form-control mb-3" placeholder="User Id"/>
                <input type="email" className="form-control mb-3" placeholder="Enter your Email"/>
                <input type="password" className="form-control mb-3" placeholder="Enter your Password"/>
                <button type="submit" className="btn btn-primary my-4" placeholder="User Id">Register</button>
            </form>
            </div>
            </div>
           
        </div>
    )
}
export default SignUp;