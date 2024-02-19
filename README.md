# taskPPT

var res = await _context.Customers
    .Where(customer => customer.CustomerId == id) // Filter by specific customer ID
    .GroupJoin(
        _context.Accounts,
        customer => customer.CustomerId,
        account => account.CustomerId,
        (customer, accounts) => new { Customer = customer, Accounts = accounts }
    )
    .SelectMany(
        group => group.Accounts.DefaultIfEmpty(),
        (group, account) => new GetcustomerDto()
        {
            CustomerId = group.Customer.CustomerId,
            CustomerFirstName = group.Customer.CustomerFirstName,
            CustomerLastName = group.Customer.CustomerLastName,
            CustomerMobile = group.Customer.CustomerMobile,
            CustomerAddress = group.Customer.CustomerAddress,
            CustomerAdharCard = group.Customer.CustomerAdharCard,
            Balance = account != null ? account.Balance : 0, // Default to 0 if account is null
            AccountNumber = account != null ? account.AccountNumber : null, // Default to null if account is null
            AccountType = account != null ? account.AccountType.TypeName : null // Default to null if account is null
        }
    )
    .ToListAsync();

responseDto.result = res;
return responseDto;
