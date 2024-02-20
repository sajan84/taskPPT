 public async Task<ResponseDto> GetAllTransaction()
 {
     try
     {
         Log.Debug("GetAllTransaction");
         var res = _bankMangementSystemContext.TransactionInfos;

         var tarnsactionList = _mappper.Map<List<AddTransactionDto>>(res);

         _responseDto.result = tarnsactionList;
         return _responseDto;

     }
     catch (Exception ex)
     {
         _responseDto.result = null;
         _responseDto.Message = ex.Message;
         _responseDto.isResult = "false";

         return _responseDto;
     }
 }




         public async Task<ResponseDto> GetTransactionofAccountNumber(string accountNumber)
        {
            try
            {
                var account = await _bankMangementSystemContext.Accounts.FirstOrDefaultAsync(ac => ac.AccountNumber.Equals(accountNumber));
                if (account == null)
                {
                    _responseDto.isResult = "false";
                    _responseDto.Message = "Account is not exist";
                    _responseDto.result = null;
                    return _responseDto;
                }
                int id = account.AccountId;
                var transactionInfo = await _bankMangementSystemContext.TransactionInfos.Where(acc=>acc.AccountId==id).ToListAsync();
                if (transactionInfo.Count== 0)
                {
                    _responseDto.isResult = "true";
                    _responseDto.Message = "No tarnsaction happen";
                    _responseDto.result =null;
                    return _responseDto;
                }

                var ans = _mappper.Map<List<AddTransactionDto>>(transactionInfo);
                

                _responseDto.result = ans;
               // GeneratePdf(_responseDto.ToString());
                return _responseDto;
            }
            catch(Exception e)
            {
                _responseDto.result = null;
                _responseDto.Message = e.Message;
                _responseDto.isResult = "false";
                return _responseDto;
            }
        }
    }
}




 public async Task<ActionResult> GetAllTransaction()
 {
     try
     {
         var res=await _transactionRepo.GetAllTransaction();
      
         return Ok(res);
     }
     catch (Exception ex)
     {
         return BadRequest(ex.Message);

    }

}

 public async Task<ActionResult> GetAllTransaction([FromRoute]string accountNumber )
 {
     try
     {
         var res = await _transactionRepo.GetTransactionofAccountNumber(accountNumber);

         return Ok(res);
     }
     catch (Exception ex)
     {
         return BadRequest(ex.Message);
     }
 }
          
