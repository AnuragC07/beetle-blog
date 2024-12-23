import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const SearchResultsModal = ({ results, closeModal }) => {
  return (
    <div
      className="fixed top-16 left-0 w-full bg-stone-900 bg-opacity-90 border-t border-stone-700 shadow-lg z-50"
      style={{ maxHeight: "300px", overflowY: "auto" }}
    >
      <div className="p-4">
        <button
          onClick={closeModal}
          className="text-white font-semibold hover:text-stone-400"
        >
          Close
        </button>

        {results.length > 0 ? (
          results.map((blog) => (
            <div key={blog._id} className="mt-4 border-b border-stone-600 pb-2">
              <Link to={`/fullblog/${blog._id}`}>
                <h2 className="text-white font-medium text-lg">{blog.title}</h2>
                <p className="text-stone-400">{blog.author}</p>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-white">No results found</p>
        )}
      </div>
    </div>
  );
};

SearchResultsModal.propTypes = {
  results: PropTypes.array.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default SearchResultsModal;
