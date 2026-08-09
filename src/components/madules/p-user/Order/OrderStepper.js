"use client"
import { StepIcon } from "./Icons";

export default function OrderStepper({ steps, currentIndex }) {
    const progressPercent = steps.length > 1 ? (currentIndex / (steps.length - 1)) * 100 : 0;

    return (
        <div>
            {/* دسکتاپ: نوار افقی */}
            <div className="sane-stepper d-none d-md-block">
                <div className="sane-stepper-track">
                    <div className="sane-stepper-progress" style={{ width: `${progressPercent}%` }} />
                </div>
                <div className="sane-stepper-steps">
                    {steps.map((step, i) => {
                        const state = i < currentIndex ? "done" : i === currentIndex ? "current" : "";
                        return (
                            <div key={step.key} className={`sane-stepper-step ${state}`}>
                                <span className="sane-stepper-icon">
                                    <StepIcon name={step.icon} size={20} />
                                </span>
                                <span className="sane-stepper-label">{step.label}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* موبایل: تایم‌لاین عمودی */}
            <div className="sane-stepper-vertical d-md-none " style={{ margin: "0 auto", width: "200px" }}>
                {steps.map((step, i) => {
                    const state = i < currentIndex ? "done" : i === currentIndex ? "current" : "";
                    return (
                        <div key={step.key} className={`sane-stepper-vstep ${state}`}>
                            <span className="sane-stepper-icon">
                                <StepIcon name={step.icon} size={20} />
                            </span>
                            <span className="sane-stepper-label" style={{ fontSize: "14px" }}>{step.label}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
