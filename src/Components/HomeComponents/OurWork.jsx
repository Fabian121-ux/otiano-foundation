import React from 'react'
import { Link } from 'react-router-dom'
import { FaGraduationCap, FaHeartbeat, FaDollarSign, FaShieldAlt } from 'react-icons/fa'

function OurWork() {
    return (
        <section id="our-work" className="bg-neutral-100 py-2">
            <div className="relative z-10 py-16">
                <div className='max-w-7xl mx-auto px-6'>
                    <h2 className="text-3xl md:text-4xl font-bold text-brand mb-8">What We Do</h2>
                    {/* <p className="text-xl md:text-2xl text-neutral-800 font-medium mb-4 max-w-2xl">
                        Opportunity for All • Possibility Everywhere
                    </p> */}
                    <p className="text-lg text-neutral-600 mb-16 max-w-3xl">
                        At Otiano Foundation for Development (OFD), our work is focused on creating inclusive opportunities and sustainable impact across communities. We deliver our mission through four core areas of intervention.
                    </p>
                </div>
                <div className="max-w-5xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className=" text-center">
                            <div className="mb-8 bg-white p-8 rounded-card shadow-sm flex items-center justify-center">
                                <FaGraduationCap className="text-brand text-6xl" />
                            </div>
                            <h3 className="text-xl font-bold text-neutral-800 mb-4">
                                Education
                            </h3>
                            <p className="text-neutral-600 mb-6 text-sm leading-relaxed">
                                We expand access to quality education and learning opportunities for underserved children and young people, laying the foundation for long-term social and economic mobility.
                            </p>
                            <Link to="/education" className="text-brand font-medium hover:underline">
                                Learn more →
                            </Link>
                        </div>

                        <div className=" text-center">
                            <div className="mb-8 bg-white p-8 rounded-card shadow-sm flex items-center justify-center">
                                <FaHeartbeat className="text-brand text-6xl" />
                            </div>
                            <h3 className="text-xl font-bold text-neutral-800 mb-4">
                                Healthcare
                            </h3>
                            <p className="text-neutral-600 mb-6 text-sm leading-relaxed">
                                We support community-based healthcare initiatives that improve access to essential services, promote preventive care, and strengthen health outcomes.
                            </p>
                            <Link to="/healthcare" className="text-brand font-medium hover:underline">
                                Learn more →
                            </Link>
                        </div>

                        <div className=" text-center">
                            <div className="mb-8 bg-white p-8 rounded-card shadow-sm flex items-center justify-center">
                                <FaDollarSign className="text-brand text-6xl" />
                            </div>
                            <h3 className="text-xl font-bold text-neutral-800 mb-4">
                                Economic Empowerment
                            </h3>
                            <p className="text-neutral-600 mb-6 text-sm leading-relaxed">
                                We equip individuals with skills, knowledge, and resources to achieve financial independence and build sustainable livelihoods.
                            </p>
                            <Link to="/economic-empowerment" className="text-brand font-medium hover:underline">
                                Learn more →
                            </Link>
                        </div>
                        <div className=" text-center">
                            <div className="mb-8 bg-white p-8 rounded-card shadow-sm flex items-center justify-center">
                                <FaShieldAlt className="text-brand text-6xl" />
                            </div>
                            <h3 className="text-xl font-bold text-neutral-800 mb-4">
                                Social Welfare & Protection
                            </h3>
                            <p className="text-neutral-600 mb-6 text-sm leading-relaxed">
                                We protect dignity and wellbeing by supporting vulnerable populations and strengthening community safety nets.
                            </p>
                            <Link to="/social-welfare" className="text-brand font-medium hover:underline">
                                Learn more →
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default OurWork