import React from "react";

export const Contacts = ({ classNames }: { classNames: string }) => {
  return (
    <div className={classNames}>
      <h5 className="font-sans text-h5 3xl:text-h2-sm">КОНТАКТИ</h5>
      <div className="flex flex-col items-center gap-4 ms:items-start">
        <a href="tel:+380 63 628 66 30">
          <p className="text-body 3xl:text-btn-semibold"> +380 63 628 66 30</p>
        </a>
        <a href="tel:+380 95 662 10 73">
          <p className="text-body 3xl:text-btn-semibold">+380 95 662 10 73</p>
        </a>

        <a href="mailto:info@baza-trainee.tech">
          <p className="text-body underline 3xl:text-btn-semibold">
            info@baza-trainee.tech
          </p>
        </a>
      </div>
    </div>
  );
};
