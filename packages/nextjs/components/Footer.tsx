import React from "react";

/**
 * Site footer
 */
export const Footer = () => {
  return (
    <div className="min-h-0 py-5 px-1 mb-11 lg:mb-0">
      <div className="w-full">
        <ul className="menu menu-horizontal w-full">
          <div className="flex justify-center items-center gap-2 text-sm w-full">
            <div className="text-center">
              <p className="m-0">© {new Date().getFullYear()} Все права защищены.</p>
              <p className="m-0">Голосование by Конышев Артем.</p>
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
};
