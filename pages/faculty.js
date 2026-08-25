import Head from 'next/head';
import { useState } from 'react';
import InteractiveModal from '../components/InteractiveModal';

import FacultyCard from '../components/FacultyCard';

export default function Faculty() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState(null);
  const facultyMembers = [
    { name: "Mr. Vineet Mishra Sir", photo: "/assets/images/faculty1.jpg" },
    { name: "Mr. Ashutosh Dwivedi Sir", photo: "/assets/images/faculty2.jpg" },
    { name: "Mr. Rajesh Kashyap Sir", photo: "/assets/images/faculty3.jpg" },
    { name: "Mr. Jitendra Sharma Sir", photo: "/assets/images/faculty4.jpg" },
    { name: "Mr. Ravishanand Sir", photo: "/assets/images/faculty5.jpg" },
    { name: "Mrs. Renu Verma Mam", photo: "/assets/images/faculty6.jpg" },
    { name: "Mr. Neeraj Sir", photo: "/assets/images/faculty7.jpg" },
    { name: "Mr. Sonu Pandey Sir", photo: "/assets/images/faculty8.jpg" },
    { name: "Mr. Dwarika Tiwari Sir", photo: "/assets/images/faculty9.jpg" },
    { name: "Mr. Vivek Sir", photo: "/assets/images/faculty10.jpg" },
    { name: "Mr. Ramashankar Gupta Sir", photo: "/assets/images/faculty11.jpg" },
    { name: "Mr.Anubhav Sir", photo: "/assets/images/faculty12.jpg" },
    { name: "Mr. C.L. Sir", photo: "/assets/images/faculty13.jpg" },
  ];

  function openMember(member) {
    setActiveFeature({ title: member.name, image: member.photo });
    setModalOpen(true);
  }

  return (
    <>
      <Head>
        <title>Akash Inter College - Faculty</title>
      </Head>
      <div className="min-h-screen bg-white-100 pt-20">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center mb-2">Our Faculty</h1>
          <p className="text-center text-gray-700 max-w-3xl mx-auto mb-8">At Akash Inter College, 30+ expert and passionate teachers guide our students towards success. Meet some of our outstanding faculty members below.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8 sm:gap-x-8 sm:gap-y-10 lg:gap-x-12 lg:gap-y-14 place-items-center">
            {facultyMembers.map((member, index) => (
              <FacultyCard
                key={index}
                name={member.name}
                photo={member.photo}
                onClick={() => openMember(member)}
              />
            ))}
          </div>
        </div>
        <InteractiveModal open={modalOpen} onClose={() => setModalOpen(false)} feature={activeFeature} />
      </div>
    </>
  );
}