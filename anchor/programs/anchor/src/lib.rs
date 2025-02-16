use anchor_lang::prelude::*;

declare_id!("9Y3VeFLH5X8igSMaNtQ9MyUjXMuc8o2aJgnWGgHvzpn1");

#[program]
pub mod anchor {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
