import React from 'react'
import "./running_man.scss"
export default function RunningMan() {
  return (
    <section className='container-section'> 
    <h1>Running...</h1>
      <div className="paper_man_wrapper">
        <div className="paper_man">

          <div className="paper_man_body part">
            <div className="paper_man_head part"></div>

            <div className="paper_man_arm left">
              <div className="paper_man_arm_1 part">
                <div className="paper_man_arm_2 part">
                  <div className="paper_man_arm_hand part"></div>
                </div>
              </div>
            </div>
            <div className="paper_man_arm right">
              <div className="paper_man_arm_1 part">
                <div className="paper_man_arm_2 part">
                  <div className="paper_man_arm_hand part"></div>
                </div>
              </div>
            </div>
            <div className="paper_man_leg left">
              <div className="paper_man_leg_1 part">
                <div className="paper_man_leg_2 part">
                  <div className="paper_man_leg_foot part"></div>
                </div>
              </div>
            </div>
            <div className="paper_man_leg right">
              <div className="paper_man_leg_1 part">
                <div className="paper_man_leg_2 part">
                  <div className="paper_man_leg_foot part"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}