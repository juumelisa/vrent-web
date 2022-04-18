import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const Counter = ()=> {
    const {counter} = useSelector(state=>state)
    const dp = useDispatch()
  useEffect(()=>{
    console.log(counter)
  }, [counter])

  const onIncrement = ()=>{
    dp({type: 'INCREMENT'})
  }
  const onDecrement = ()=>{
    dp({type: 'DECREMENT'})
  }
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="row">
            <div className="col">
                <button onClick={onDecrement}>-</button>
            </div>
            <div className="col">
                <h1>{counter.num}</h1>
            </div>
            <div className="col">
                <button onClick={onIncrement}>+</button>
            </div>
        </div>
        <Link to="/login">Login</Link>
    </div>
  );
}
// const mapStateToProps = state => ({auth:state.auth, counter: state.counter})
// const mapDispatchToProps = dispatch=>({dispatch})

// export default connect(mapStateToProps, mapDispatchToProps)(Counter);
export default Counter