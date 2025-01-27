const getPaginationMetadata = (pageNo = 1, limitNo = 10) => {
   const page = parseInt(pageNo, 10) || 1;
   const limit = parseInt(limitNo, 10) || 10;
   const skip = (page - 1) * limit;
   return { page, limit, skip };
 };
 
 const getPaginatedResponse = (data, totalCount, page, limit) => {
   return {
     page_data: data,
     page_information: {
       total_data: totalCount,
       last_page: Math.ceil(totalCount / limit),
       current_page: page,
       previous_page: page > 1 ? page - 1 : null,
       next_page: page < Math.ceil(totalCount / limit) ? page + 1 : null,
     },
   };
 };
 
 module.exports = {
   getPaginationMetadata,
   getPaginatedResponse,
 };
 