import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbbar';
import './LoanTracker.css';
import axios from 'axios';

export default function LoanTracker() {
    const [applications, setApplications] = useState([]);
    const [showPaymentForm, setShowPaymentForm] = useState(false);
    const [showPaymentDetails, setShowPaymentDetails] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState([]);
    const [paymentID, setPaymentID] = useState('');
    const [activeApplication, setActiveApplication] = useState([]);

    const [repaymentModels,setRepaymentModels]=useState([])
    const [repaymentView,setRepaymentView]=useState(false);

    const [repaymentId,setRepaymentId]=useState(0);
    const [loanId,setLoanId]=useState(0);

    const fetchLoggedInUserId = async () => {
        try {
            const response2 = await axios.get(`http://localhost:8080/data/getallbyuser`);
            setApplications(response2.data);
            console.log(response2.data);
        } catch (error) {
            console.error('Error fetching logged-in user:', error);
        }
    };

    useEffect(() => {
        fetchLoggedInUserId();
    }, []);

    const handlePayNowClick = (data) => {
      // console.log(application)
      setSelectedApplication(data);
      setShowPaymentForm(true);
      //   console.log(loanId)
      //   console.log(repaymentId)
      const dataId = data.dataId;
      const firstRepaymentId = data.repaymentModels.length > 0 ? data.repaymentModels[0].id : null;
      console.log('Data ID:', dataId);
      console.log('First Repayment ID:', firstRepaymentId);
      setRepaymentId(firstRepaymentId);
      setLoanId(dataId)
    };

    const handlePaymentSubmit = async (e) => {
        try {
          e.preventDefault();
            const response = await axios.delete(`http://localhost:8080/data/paymentdelete/${loanId}/${repaymentId}`);

            setPaymentID(response.data); 
            setShowPaymentForm(false);
            setShowPaymentDetails(true);
        } catch (error) {
            console.error('Error processing payment:', error);
        }
    };

    const handleBackToTable = () => {
        setShowPaymentDetails(false);
        setSelectedApplication(null);
        fetchLoggedInUserId();
    };
    
    const cancelPayment=()=>{
        setShowPaymentForm(false)
        setSelectedApplication(null);
        fetchLoggedInUserId();
    }

    const handleViewRepayment=(app)=>{
        setRepaymentModels(app.repaymentModels)
        setRepaymentView(true);
    }
    const handleHideSchedule=()=>{
        setRepaymentModels([])
        setRepaymentView(false);
    }
    

    return (
        <>
            <Navbar />
            <div className='loan-applications'>
                <br /><br /><br /><br />
                <div><h2>Loan Tracker</h2></div>
                <div className='loan-application-container'>
                    <div className='loan-application-library'>
                        {applications.length === 0 ? (
                            <p className='loan-no-applications'>No applications submitted yet.</p>
                        ) : (
                            <table className='loan-application-table'>
                                <thead>
                                    <tr>
                                        <th>Application Id</th>
                                        <th>Name</th>
                                        <th>Loan Type</th>
                                        <th>Loan Amount</th>
                                        <th>Date Applied</th>
                                        <th>Next Repayment Date</th>
                                        <th>Repayment Amount</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {applications.filter(app => app.loanStatus === "Approved").map(app => (
                                        <tr key={app.id}>
                                            <td>{app.dataId}</td>
                                            <td>{app.firstName} {app.lastName}</td>
                                            <td>{app.loanType}</td>
                                            <td>{app.loanAmount}</td>
                                            <td>{app.submittedAt}</td>
                                            <td>{app.repaymentModels[0].date}</td>
                                            <td>{app.repaymentModels[0].amount}</td>
                                            <td>
                                                <button
                                                    className='payment-button'
                                                    onClick={() => handlePayNowClick(app)}
                                                >
                                                    Pay Now
                                                </button>
                                                <button
                                                    className='payment-button'
                                                    onClick={() => handleViewRepayment(app)}
                                                >
                                                    View Schedule
                                                </button>
    

                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                        )}
                    </div>
                </div>

                {showPaymentForm && (
                    <div className='payment-form-container'>
                        <div className='payment-form'>
                            <h2>Payment Form</h2>
                            <form onSubmit={handlePaymentSubmit}>
                                <label>
                                    Card Number:
                                    <input type="text" name="cardNumber" required />
                                </label>
                                <label>
                                    Expiry Date:
                                    <input type="text" name="expiryDate" required />
                                </label>
                                <label>
                                    CVV:
                                    <input type="text" name="cvv" required />
                                </label>
                                <label>
                                    Name:
                                    <input type="text" name="name" required />
                                </label>
                                <button type="submit">Submit Payment</button>
                                <button type="button" onClick={cancelPayment}>Cancel Payment</button>
                            </form>
                        </div>
                    </div>
                )}

                {showPaymentDetails && (
                    <div className='payment-details-container'>
                        <div className='payment-details'>
                            <h2>Payment Details</h2>
                            <p>Name: {selectedApplication.firstName} {selectedApplication.lastName}</p>
                            <p>Amount: {selectedApplication.repaymentModels[0].amount}</p>
                            <p>Date: {new Date().toLocaleDateString()}</p>
                            <p>Payment ID: {paymentID}</p>
                            <button className='back-button' onClick={handleBackToTable}>Back to Tracker</button>
                        </div>
                    </div>
                )}

                {repaymentView && (
                    <div className='repayment-container'>
                    <button onClick={()=>handleHideSchedule()} className='repayment-close-btn'>X</button>
                        <table className='repayment-schedule-table'>
                        <thead>
                          <tr>
                            <th>Repayment Date</th>
                            <th>Repayment Amount</th>
                            <th>Payment Status</th>
                          </tr>
                        </thead>
                        <tbody>
                            {repaymentModels.map((model, index) => (
                              <tr key={index}>
                                <td>{model.date}</td>
                                <td>{model.amount}</td>
                                <td>{model.paymentStatus ? 'Paid' : 'Not Paid'}</td>
                              </tr>
                            ))}
                        </tbody>

                      </table>
                      </div>

                    )}

            </div>
        </>
    );
}
