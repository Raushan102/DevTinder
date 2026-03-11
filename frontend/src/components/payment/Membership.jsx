import GlassmorphismLayout from "../util/Glassmorphismlayout";
import { Crown, ShieldCheck, Zap, Star, ArrowRight } from "lucide-react";
import axios from "axios";
import { BASE_URL } from '../util/constent';
import { useNavigate } from "react-router-dom";

const Membership = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: "Bronze",
      price: "10",
      connections: "20",
      chat: "Basic Chat",
      color: "text-orange-900",
      indicator: "bg-orange-900",
      fill: "bg-orange-800",
      hoverStyle: "hover:bg-orange-600/10 hover:border-orange-900/40",
      icon: <Star size={18} strokeWidth={3} />,
    },
    {
      name: "Silver",
      price: "50",
      connections: "100",
      chat: "Priority Chat",
      color: "text-slate-900",
      indicator: "bg-slate-900",
      fill: "bg-slate-800",
      hoverStyle: "hover:bg-slate-500/10 hover:border-slate-900/40",
      icon: <ShieldCheck size={18} strokeWidth={3} />,
    },
    {
      name: "Gold",
      price: "100",
      connections: "Unlimited",
      chat: "Unlimited Chat",
      color: "text-yellow-900",
      indicator: "bg-yellow-900",
      fill: "bg-yellow-700",
      hoverStyle: "hover:bg-yellow-500/15 hover:border-yellow-900/60",
      icon: <Crown size={18} strokeWidth={3} />,
      popular: true,
    },
  ];

  async function handleCardPick(profile) {

    try {
      const response = await axios.post(`${BASE_URL}/payment/createOrder`, {
        membershipType: profile.name
      }, { withCredentials: true });

      const {
        userId,
        orderId,
        notes,
        membershipType,
        amount,
        currency,
        status,
        paymentMethod,
        startDate,
        endDate,
        receipt,
        _id,
        createdAt,
        updatedAt,
        __v,
        keyId,
        email
      } = response.data;

      // Open Razorpay Checkout
      const options = {
        key: keyId,
        amount,
        currency,
        name: 'Devtinder',
        description: 'Connect to another developer',
        order_id: orderId,
        handler: async function (razorpayResponse) {
          // Payment successful - verify on backend
          console.log('Payment successful, verifying...', razorpayResponse);

          try {
            const verifyResponse = await axios.post(
              `${BASE_URL}/payment/verify`,
              {
                razorpay_order_id: razorpayResponse.razorpay_order_id,
                razorpay_payment_id: razorpayResponse.razorpay_payment_id,
                razorpay_signature: razorpayResponse.razorpay_signature
              },
              { withCredentials: true }
            );

            if (verifyResponse.data.success) {
              console.log('✅ Payment verified successfully!');
              navigate("/premium-success", {
                state: {
                  plan: profile.name,
                  orderId: verifyResponse.data.orderId || orderId
                }
              });
            } else {
              console.error('❌ Payment verification failed');
              navigate("/premium-failed", {
                state: { message: 'Payment verification failed. Please contact support.' }
              });
            }
          } catch (error) {
            console.error('Verification error:', error);
            navigate("/premium-failed", {
              state: { message: 'Error verifying payment. Please contact support with order ID: ' + orderId }
            });
          }
        },
        prefill: {
          name: notes.firstName + " " + notes.lastName,
          email: email,
          contact: '9999999999'
        },
        theme: {
          color: '#000000',
          backdrop_color: 'rgba(255, 255, 255, 0.1)'
        },
        modal: {
          ondismiss: function () {
            console.log('Checkout form closed by user');
            alert('Payment cancelled');
          },
          escape: false,
          backdropclose: false
        }
      };

      const rzp = new window.Razorpay(options);

      rzp.on('payment.failed', function (response) {
        console.error('Payment failed:', response.error);
        navigate("/premium-failed", {
          state: { message: 'Payment failed: ' + response.error.description }
        });
      });

      rzp.open();

    } catch (error) {
      console.error('Error creating order:', error);
      navigate("/premium-failed", {
        state: { message: 'Failed to initiate payment. Please try again later.' }
      });
    }
  }

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center px-4 overflow-hidden">

      {/* COMPACT HEADER */}
      <div className="text-center mb-4 space-y-1">
        <div className="flex items-center justify-center gap-2">
          <Zap size={12} className="text-black" strokeWidth={3} />
          <span className="text-[8px] font-black uppercase tracking-[0.4em] text-black">Subscription Terminal</span>
        </div>
        <h1 className="text-black text-3xl sm:text-4xl font-black tracking-tighter uppercase italic leading-none">
          Member<span className="text-black/50">ship</span>
        </h1>
        <div className="h-1 w-12 bg-black mx-auto mt-1" />
      </div>

      {/* PRICING GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-1 max-w-4xl w-full border-2 border-black/10 shadow-2xl bg-white/5 backdrop-blur-md">
        {plans.map((plan, index) => (
          <div
            key={plan.name}
            className={`relative group p-5 h-[24rem] sm:p-8 flex flex-col transition-all duration-500 border-black/5 ${index !== plans.length - 1 ? "md:border-r-2" : ""
              } bg-white/20 backdrop-blur-3xl ${plan.hoverStyle}`}
          >
            <div className="relative z-10 flex flex-col h-full">

              <div className={`${plan.color} mb-3 flex justify-between items-center`}>
                {plan.icon}
                {plan.popular && (
                  <span className="text-[7px] font-black tracking-[0.1em] bg-black text-white px-2 py-0.5">ELITE_NODE</span>
                )}
              </div>

              <h2 className="text-black text-xl font-black uppercase italic mb-1 tracking-tighter leading-none">
                {plan.name}
              </h2>

              <div className="flex items-baseline gap-1 mb-4 text-black">
                <span className="text-sm font-black italic">₹</span>
                <span className="text-5xl font-black tracking-tighter leading-none">{plan.price}</span>
                <span className="text-[9px] font-black opacity-40 uppercase tracking-widest">/mo</span>
              </div>

              <ul className="space-y-2 mb-6 flex-grow">
                <li className="flex items-center gap-3">
                  <div className={`w-1.5 h-1.5 ${plan.indicator}`} />
                  <span className="text-[9px] font-black text-black uppercase tracking-widest leading-none">
                    {plan.connections} Requests
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <div className={`w-1.5 h-1.5 ${plan.indicator}`} />
                  <span className="text-[9px] font-black text-black uppercase tracking-widest leading-none">
                    {plan.chat} Access
                  </span>
                </li>
                <li className="flex items-center gap-3 border-t border-black/10 pt-2">
                  <div className="w-1.5 h-1.5 bg-black/20" />
                  <span className="text-[9px] font-black text-black/30 uppercase tracking-widest leading-none">
                    Secure Link
                  </span>
                </li>
              </ul>

              {/* ANIMATED SLIDE-FILL BUTTON */}
              <button
                className="relative w-full h-11 border-2 border-black bg-transparent text-black text-[9px] font-black uppercase tracking-[0.3em] overflow-hidden group/btn transition-colors duration-300"
                onClick={() => handleCardPick(plan)}
              >
                {/* Fill Layer */}
                <span className={`absolute inset-0 ${plan.fill} transform -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500 ease-out`}></span>

                {/* Content Layer */}
                <span className="relative z-10 flex items-center justify-center gap-2 group-hover/btn:text-white transition-colors duration-300">
                  Activate {plan.name}
                  <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* SECURITY LOG */}
      <div className="mt-4 opacity-30">
        <p className="text-[8px] font-black uppercase tracking-[0.4em] text-black text-center">
          Protocol: SECURE_v2.0 // NO_HIDDEN_FEE
        </p>
      </div>
    </div>
  );
};

export default Membership;
