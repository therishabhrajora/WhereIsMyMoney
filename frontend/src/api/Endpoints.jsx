const url = "http://localhost:9090/"; // Added explicit protocol prefix to avoid fetch errors

export const Endpoints = {
     // Base URLs
     baseUrl: url,

     // Messaging Routes
     homepage: `${url}`,
     getMessages: `${url}api/messages`,
     sendMessage: `${url}api/messages/send`,
     deleteMessage: (id) => `${url}api/messages/delete/${id}`,

     // Expense Tracker Records Routes
     getRecords: `${url}api/records`,
     addRecord: `${url}api/records/add`,
     updateRecord: (id) => `${url}api/records/update/${id}`,
     deleteRecord: (id) => `${url}api/records/delete/${id}`,

     // Aggregations & Analytics Routes
     getDailyExpenses: `${url}api/analytics/daily`,
     getMonthlyStatistics: `${url}api/analytics/monthly`,
     getYearlyStatistics: `${url}api/analytics/yearly`
     
};
